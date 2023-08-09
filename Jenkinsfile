pipeline {
  agent any

  environment {
    b2bucketSourceId = credentials('files-gateway-b2bucketSourceId')
    b2AppKey       = credentials('files-gateway-b2AppKey')
    b2AppKeyId     = credentials('files-gateway-b2AppKeyId')
    authUrl        = credentials('files-gateway-authUrl')
  }

  stages {
    stage('build') {
      steps {
        sh 'docker build -t ezraweb/files-gateway:latest --build-arg b2bucketSourceId="${b2bucketSourceId}" --build-arg b2AppKeyId="${b2AppKeyId}" --build-arg b2AppKey="${b2AppKey}" --build-arg authUrl="${authUrl}" .'
      }
    }
  }
}
