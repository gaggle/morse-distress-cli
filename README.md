# morse-distress-cli
[![Build Status](https://travis-ci.org/gaggle/morse-distress-cli.svg?branch=master)](https://travis-ci.org/gaggle/morse-distress-cli)
[![Coverage Status](https://coveralls.io/repos/github/gaggle/morse-distress-cli/badge.svg?branch=master)](https://coveralls.io/github/gaggle/morse-distress-cli?branch=master)

Military-grade cryptologic CLI to communicate securly with your homebase.
[It even works off-world](https://gist.github.com/kmckelvin/41a4a69e397b510274373aa241698561)!

![Example](simple-morse.gif)

```
$ bin/morse --help
Usage: bin/morse [text] [options]

Options:
--file, -f, -i, --input    Path to file containing text        [default: null]
--obfuscate, -o, --garble  Also obfuscate the text            [default: false]
--write, -w                Path to where output will be written[default: null]
-h, --help                 Show help                                 [boolean]

Examples:
bin/morse Laying an egg
bin/morse -f secrets.txt --obfuscate
```
