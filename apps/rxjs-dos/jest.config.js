module.exports = {
  name: 'rxjs-dos',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/rxjs-dos',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
