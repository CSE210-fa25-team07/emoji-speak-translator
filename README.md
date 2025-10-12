# Emoji Speak Translator WebApp
Aggregated components for the Emoji Speak Translator WebApp

## Testing Locally
To test your changes locally, we use [Node.js](https://nodejs.org/en). 

### Install
MacOS and Windows users can use the link above to install it.

Linux users may be able to install using their built-in package managers

*Ubuntu Example*
```sh
sudo apt update
sudo apt install nodejs npm -y
```
### Verify
```sh
node -v
npm -v
```
### Building Test Environment
```sh
npm ci
```
npm ci installs exact versions from package-lock.json.

A node_modules/ folder should be created locally.
### Testing
Run `npm test`. Below is an example output with basic tests
```sh
npm test

> emoji-translator-webapp@1.0.0 test
> jest

 PASS  tests/translation.test.js
  ✓ translates happy (3 ms)
  ✓ translates sad
  ✓ translates love (1 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        0.482 s, estimated 1 s
```
