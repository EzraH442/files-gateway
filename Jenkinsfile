pipeline {
  agent any

  environment {
    bucketSourceId = credentials('files-gateway-b2bucketSourceId')
    b2AppKey       = credentials('files-gateway-b2AppKey')
    b2AppKeyId     = credentials('files-gateway-b2AppKeyId')
  }

  stages {
    stage('build') {
      steps {
        sh 'docker build -t ezraweb/files-gateway:latest . '
      }
    }
  }
}
