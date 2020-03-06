node {
    // limit concurrent build
    properties([disableConcurrentBuilds()])

    def PWD = pwd()

    stage('get repo') {
        git (
            url: 'ssh://git@212.129.149.40:222/rubiks-cube/frontend-oasis.git',
            credentialsId: '1aa8f007-25af-4f0b-9140-0b97570f30df',
            branch: env.BRANCH_NAME
        )
        sh 'chmod 755 ${PWD}/jenkins/*.sh'
    }

    def changed = hasPackageChanged()
    def baselineImage = ''

    stage('rebuild baseline image') {
        // rebuild when package.json change
        if (changed) {
            sh 'cp -a package.json ${PWD}/jenkins/baseline/package.json'
            def baselineRegistry = 'seciii/frontend-baseline'
            baselineImage = docker.build(
                "$baselineRegistry:$BUILD_NUMBER",
                "${PWD}/jenkins/baseline"
            )
        } else {
            echo 'dependencies not changed'
        }
    }

    def registrySite = 'https://registry.cn-hangzhou.aliyuncs.com/'
    def registryCredential = 'aliyunhub'

    parallel(
        'push baseline image': {
            stage('push image') {
                if (changed) {
                    docker.withRegistry( registrySite, registryCredential ) {
                        baselineImage.push()
                        baselineImage.push('latest')
                    }
                } else {
                    echo 'do not need to push image'
                }
            }
        },
        'build': {
            stage('get baseline') {
                if (changed) {
                    // stop former baseline container & restart
                    sh '${PWD}/jenkins/stop-baseline.sh'
                    baselineImage.run('--name frontend-baseline')
                } else {
                    sh '${PWD}/jenkins/get-baseline.sh'
                }
            }
            // serializable build
            lock(resource: 'package', inversePrecedence: true) {
                stage('package resources') {
                    docker
                    .image('node:12.16.0-alpine')
                    .inside('--volumes-from frontend-baseline -v jenkins-data:/var/jenkins_home') {
                        sh 'cp -a . /opt/app'
                        // stage('lint') {
                        //     sh 'cd /opt/app && npm run lint'
                        // }
                        stage('build') {
                            sh 'cd /opt/app && npm run build'
                            sh 'cp -a /opt/app/oasis .'
                        }
                        stage('unit test') {
                            stage('do test') {
                                sh 'nohup node ${PWD}/json-server.js &'
                                sh 'cd /opt/app && npm run test:unit'
                                sh "${PWD}/jenkins/stop-json-server.sh"
                            }
                            stage('coverage report') {
                                sh 'cp -a /opt/app/coverage .'
                                publishHTML([
                                    allowMissing: false,
                                    alwaysLinkToLastBuild: false,
                                    keepAll: false,
                                    reportDir: 'coverage/lcov-report',
                                    reportFiles: 'index.html',
                                    reportName: 'Jest Coverage Report',
                                    reportTitles: 'Jest Coverage Report'
                                ])
                            }
                        }
                        // stage('e2e test') {
                        // sh 'cd /opt/app && npm run test:e2e'
                        // }
                        stage('clear baseline') {
                            sh 'cd /opt/app && rm -rf `ls | grep -v "^node_modules$"`'
                        }
                    }
                }
            }

            // deploy
            if (env.BRANCH_NAME =~ 'develop|hotfix.*|release.*') {
                // serializable build
                lock(resource: 'service', inversePrecedence: true) {
                    stage('service down') {
                        sh '${PWD}/jenkins/service-down.sh'
                    }
                    stage('release image') {
                        def registry = 'seciii/frontend-proxy'
                        def nginxImage = docker.build("$registry:$BUILD_NUMBER")
                        docker.withRegistry( registrySite, registryCredential ) {
                            nginxImage.push()
                            nginxImage.push('latest')
                        }
                        sh "docker image rm $registry:$BUILD_NUMBER"
                    }
                    stage('service restart'){
                        docker
                        .image('registry.cn-hangzhou.aliyuncs.com/seciii/frontend-proxy:latest')
                        .run('-p 8080:443 --name frontend-proxy')
                    }
                }
            }
        }
    )
}

@NonCPS
def hasPackageChanged() {
    def result = false
    currentBuild.changeSets.each { change ->
        change.items.each { item ->
            item.affectedFiles.each { file ->
                echo "${file.path}"
                if (file.path == 'package.json') {
                    result = true
                }
            }
        }
    }
    return result
}
