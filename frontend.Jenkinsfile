pipeline {
  agent any

   stages {
    stage('Clean') {
      steps {
        sh './build/clean.sh'
      }
    }

    stage('Landing') {
      steps {
        sh 'docker-compose -f docker-compose.frontend.yml run landing sh -c "npm run build && npm run export"'
      }
    }

    stage('Web app') {
      steps {
        sh 'docker-compose -f docker-compose.frontend.yml run web_app sh -c "npm run build"'
      }
    }

    stage('Admin panel') {
      steps {
        sh 'docker-compose -f docker-compose.frontend.yml run admin_panel sh -c "npm run build"'
      }
    }

    stage('Start') {
      steps {
        sh 'docker-compose -f docker-compose.frontend.yml up -d --force-recreate'
      }
    }
  }
}
