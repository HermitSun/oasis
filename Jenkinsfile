node {
    def PWD = pwd()

    stage('get repo') {
        git (
            url: 'ssh://git@212.129.149.40:222/rubiks-cube/frontend-oasis.git',
            credentialsId: '1aa8f007-25af-4f0b-9140-0b97570f30df',
            branch: env.BRANCH_NAME
        )
        sh 'chmod 755 ${PWD}/jenkins/*.sh'
    }

    stage('package resources') {
        docker
        .image('node:12.16.0-alpine')
        .inside('--volumes-from frontend-baseline -v jenkins-data:/var/jenkins_home') {
            sh 'cp -a . /opt/app'
            stage('lint') {
                sh 'cd /opt/app && npm run lint'
            }
            stage('build') {
                sh 'cd /opt/app && npm run build'
                sh 'cp -a /opt/app/oasis .'
            }
            stage('unit test') {
                sh 'cd /opt/app && npm run test:unit'
            }
            // stage('e2e test') {
            // sh 'cd /opt/app && npm run test:e2e'
            // }
            stage('clear baseline') {
                sh 'cd /opt/app && rm -rf `ls | grep -v "^node_modules$"`'
            }
        }
    }

    if (env.BRANCH_NAME =~ 'develop|hotfix.*|release.*') {
        stage('service down') {
            sh '${PWD}/jenkins/service-down.sh'
        }
        stage('release image') {
            def registrySite = 'https://registry.cn-hangzhou.aliyuncs.com/'
            def registry = 'seciii/frontend-proxy'
            def registryCredential = 'aliyunhub'
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
