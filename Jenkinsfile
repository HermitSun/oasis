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
            stage('build frontend image') {
                def frontendRegistry = 'seciii/frontend-app'
                frontendImage = docker.build("$frontendRegistry:$BUILD_NUMBER")
            }

            parallel(
                'push frontend image': {
                    docker.withRegistry( registrySite, registryCredential ) {
                        baselineImage.push()
                        baselineImage.push('latest')
                    }
                },
                'service restart': {
                    stage('service down') {
                        sh '${PWD}/jenkins/service-down.sh'
                    }

                    stage('service up') {
                        docker
                        .image('registry.cn-hangzhou.aliyuncs.com/seciii/frontend-app:latest')
                        .run('-p 443:443 --name frontend-app')
                    }
                }
            )
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
