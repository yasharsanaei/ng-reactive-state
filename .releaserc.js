module.exports = {
  pkgRoot: 'dist/',
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        releaseRules: [
          { type: 'feat', release: 'minor' },
          { type: 'fix', release: 'patch' },
          { type: 'refactor', release: 'patch' },
          { type: 'style', release: 'patch' },
          { type: 'improve', release: 'patch' },
          { type: 'perf', release: 'major' },
          { breaking: true, release: 'minor' }
        ],
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES']
        }
      }
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: {
          types: [
            { type: 'feat', section: 'Features' },
            { type: 'fix', section: 'Bug Fixes' },
            { type: 'style', section: 'Style Changes' },
            { type: 'improve', section: 'Improvements' },
            { type: 'docs', section: 'Docs' }
          ]
        },
        writerOpts: {}
      }
    ],
    '@semantic-release/changelog',
    '@semantic-release/npm',
    [
      '@semantic-release/git',
      {
        message: 'chore: Release <%= nextRelease.version %> [skip ci]',
        assets: ['package.json', 'projects/ng-reactive-state/package.json', 'CHANGELOG.md']
      }
    ],
    '@semantic-release/github'
  ],
  branches: ['master']
};
