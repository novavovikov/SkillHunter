pipeline {
  agent any

  environment {
    DOCKER_FILE = "./deployment/prod/docker-compose.backend.yml"
  }

   stages {
    stage('Clean') {
      steps {
        sh './deployment/clean.sh'
      }
    }
  }
}
