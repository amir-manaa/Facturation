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
    stage('Hello') {
      steps {
        sh 'echo "Hello World"'
      }
    }
  }
}
