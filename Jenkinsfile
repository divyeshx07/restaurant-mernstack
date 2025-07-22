pipeline {
  agent any

  environment {
    DOCKER_HUB = 'divyeshh07'
    BACKEND_IMAGE = "${DOCKER_HUB}/restaurant-backend:01"
    FRONTEND_IMAGE = "${DOCKER_HUB}/restaurant-frontend:01"
  }

  stages {

    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/divyeshx07/restaurant-mernstack.git'
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

    stage('Run Backend Container') {
      steps {
        script {
          bat 'docker stop restaurant-backend || exit 0'
          bat 'docker rm restaurant-backend || exit 0'
          bat "docker run -d --name restaurant-backend -p 7000:7000 ${BACKEND_IMAGE}"
          bat "docker ps -a"
        }
      }
    }

    stage('Run Frontend Container') {
      steps {
        script {
          bat 'docker stop restaurant-frontend || exit 0'
          bat 'docker rm restaurant-frontend || exit 0'
          bat "docker run -d --name restaurant-frontend -p 2000:80 ${FRONTEND_IMAGE}"
          bat "docker ps -a"
        }
      }
    }

    stage('Push Images to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          script {
            bat "docker login -u %DOCKER_USER% -p %DOCKER_PASS%"
            bat "docker push ${BACKEND_IMAGE}"
            bat "docker push ${FRONTEND_IMAGE}"
          }
        }
      }
    }
    
    stage('Show Logs') {
      steps {
        script {
          bat "docker logs restaurant-backend"
          bat "docker logs restaurant-frontend"
        }
      }
    }
  }
}
