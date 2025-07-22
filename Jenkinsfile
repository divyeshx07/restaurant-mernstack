pipeline {
  agent any

  environment {
  BUILD_ID = "${env.BUILD_ID}"
  BACKEND_IMAGE = "divyeshh07/restaurant-backend:${BUILD_ID}"
  FRONTEND_IMAGE = "divyeshh07/restaurant-frontend:${BUILD_ID}"
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
          docker.build("${BACKEND_IMAGE}", './backend')
        }
      }
    }

    stage('Build Frontend Image') {
      steps {
        script {
          docker.build("${FRONTEND_IMAGE}", './frontend')
        }
      }
    }

    stage('Stop Old Containers') {
      steps {
        script {
          sh '''
          docker stop restaurant-backend || true
          docker rm restaurant-backend || true
          docker stop restaurant-frontend || true
          docker rm restaurant-frontend || true
          '''
        }
      }
    }

    stage('Run Backend Container') {
      steps {
        script {
          sh "docker run -d -p 7000:7000 --name restaurant-backend ${BACKEND_IMAGE}"
        }
      }
    }

    stage('Run Frontend Container') {
      steps {
        script {
          sh "docker run -d -p 2000:80 --name restaurant-frontend ${FRONTEND_IMAGE}"
        }
      }
    }
  }
}
