pipeline {
  agent any

  environment {
    BACKEND_IMAGE = "divyeshh07/restaurant-backend:01"
    FRONTEND_IMAGE = "divyeshh07/restaurant-frontend:01"
  }

  stages {

    stage('Checkout') {
      steps {
        git branch: 'main',
            url: 'https://github.com/divyeshx07/restaurant-mernstack.git'
      }
    }

    stage('Build Backend Image') {
      steps {
        script {
          bat "docker build -t ${BACKEND_IMAGE} ./backend"
        }
      }
    }

    stage('Build Frontend Image') {
      steps {
        script {
          bat "docker build -t ${FRONTEND_IMAGE} ./frontend"
        }
      }
    }

    stage('Stop Old Containers') {
      steps {
        script {
          bat '''
          docker stop restaurant-backend || exit 0
          docker rm restaurant-backend || exit 0
          docker stop restaurant-frontend || exit 0
          docker rm restaurant-frontend || exit 0
          '''
        }
      }
    }

    stage('Run Backend Container') {
      steps {
        script {
          bat "docker run -d -p 7000:7000 --name restaurant-backend ${BACKEND_IMAGE}"
        }
      }
    }

    stage('Run Frontend Container') {
      steps {
        script {
          bat "docker run -d -p 2000:80 --name restaurant-frontend ${FRONTEND_IMAGE}"
        }
      }
    }
  }
}
