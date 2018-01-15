'use strict';

var path = require('path');
var fs = require('fs');
var spawnSync = require('child_process').spawnSync;
var certsFolder = path.join(__dirname, '..', 'certs');
var metadataUnsignedFilename = path.join(__dirname, 'metadata-unsigned.xml');

process.stdout.write('Reading metadata template... ');
var metadataTemplate = fs.readFileSync(path.join(__dirname, 'metadata-template.xml'), 'utf8');
process.stdout.write('done.\n');

process.stdout.write('Reading certificate... ');
var cert = fs.readFileSync(path.join(certsFolder, 'spid-testenv-identityserver-crt.pem'), 'utf8');
process.stdout.write('done.\n');

process.stdout.write('Removing certificate header/footer... ');
var plainCert = cert
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/^--+\s*BEGIN CERTIFICATE\s*--+\n/, '')
    .replace(/\n--+\s*END CERTIFICATE\s*--+/, '')
    .trim();
process.stdout.write('done.\n');

process.stdout.write('Creating unsigned metadata... ');
var metadataUnsigned = metadataTemplate.replace(/<!--\s*CERTIFICATE_PLACEHOLDER\s*-->/g, plainCert);
process.stdout.write('done.\n');

process.stdout.write('Saving unsigned metadata... ');
fs.writeFileSync(metadataUnsignedFilename, metadataUnsigned, 'utf8');
process.stdout.write('done.\n');
try {
    var spawnResult;
    process.stdout.write('Signing metadata... ');
    spawnResult = spawnSync(
        './xmlsectool-2.0.0/xmlsectool.sh',
        ['--sign', '--inFile', 'metadata-unsigned.xml', '--certificate', '../certs/spid-testenv-identityserver-crt.pem', '--key', '../certs/spid-testenv-identityserver-key.pem', '--outFile', '../public/assets/idp-metadata.xml'],
        {
            cwd: __dirname,
            shell: true,
            encoding: 'utf8'
        }
    );
    if (spawnResult.status !== 0) {
        console.error(spawnResult.stderr || spawnResult.stdout);
        throw new Error('xmlsectool failed!');
    }
    process.stdout.write('done.\n');
    process.stdout.write('Formatting metadata... ');
    spawnResult = spawnSync(
        'xmllint',
        ['--format', '--output', '../public/assets/idp-metadata.xml', '../public/assets/idp-metadata.xml'],
        {
            cwd: __dirname,
            shell: true,
            encoding: 'utf8'
        }
    );
    if (spawnResult.status !== 0) {
        console.error(spawnResult.stderr || spawnResult.stdout);
        throw new Error('xmllint failed!');
    }
    process.stdout.write('done.\n');
} finally {
    try {
        fs.unlinkSync(metadataUnsignedFilename);
    } catch (e) {
    }
}
