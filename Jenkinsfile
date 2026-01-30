/*************************
  Scripted pipeline
  ***********************/
/*node {
  stage('Hello') {
    sh 'echo "Helle World !"'
  }
}*/

/*************************
  Declarative pipeline
  ***********************/
pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'echo "Build..."'
      }
    }
    stage('Test') {
      steps {
        sh 'echo "Test..."'
      }
    }
    stage('Deploy') {
      steps {
        sh 'echo "Deploy..."'
      }
    }
  }
}
