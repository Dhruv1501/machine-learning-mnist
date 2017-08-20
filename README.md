## What is MNIST (source)

MNIST database (Modified National Institute of Standards and Technology database) is a large database of handwritten digits that is commonly used for training various image processing systems. The database is also widely used for training and testing in the field of machine learning. It was created by "re-mixing" the samples from NIST's original datasets. The creators felt that since NIST's training dataset was taken from American Census Bureau employees, while the testing dataset was taken from American high school students, it was not well-suited for machine learning experiments. Furthermore, the black and white images from NIST were normalized to fit into a 20x20 pixel bounding box and anti-aliased, which introduced grayscale levels.

The MNIST database contains 60,000 training images and 10,000 testing images. Half of the training set and half of the test set were taken from NIST's training dataset, while the other half of the training set and the other half of the test set were taken from NIST's testing dataset. There have been a number of scientific papers on attempts to achieve the lowest error rate; one paper, using a hierarchical system of convolutional neural networks, manages to get an error rate on the MNIST database of 0.23 percent. The original creators of the database keep a list of some of the methods tested on it. In their original paper, they use a support vector machine to get an error rate of 0.8 percent.

## Machine Learning

In this project I converted MNIST database to JSON, for ease of work in JavaScript. I'm used [Synaptic JS](http://caza.la/synaptic/#/) Neural Network framework to train on approximately 80% of data. Then used remaining 20% to test. It is also possible to draw your own digits and get it recognized with a high level of correctness.

## Demo
  ![image](./images/mnist.gif)

### How to run

```
  $ yarn install
  $ yarn start
```

### notable projects

 - [SynapticJs](http://caza.la/synaptic/#/)
 - [Bicubic Sample](https://www.npmjs.com/package/bicubic-sample)
 - [React Sketchpad](https://www.npmjs.com/package/react-sketchpad) *(special thanks for accepting my Pull Request)*
 - [React](https://www.npmjs.com/package/react)