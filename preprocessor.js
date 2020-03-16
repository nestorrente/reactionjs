// run on typescript AMD output.
module.exports.typescriptOutput = function(javascriptCode) {
    return javascriptCode;
};

// run on typescript-bundle output.
module.exports.bundleOutput = function(javascriptCode) {
    // TODO minimize code
    return appendHeader(javascriptCode);
};

const HEADER_COMMENT = `/*!
 * Reaction.js v0.1.0
 * https://github.com/nestorrente/reactionjs
 *
 * Released under the MIT License.
 *
 * Build date: ${formatDate(new Date())}
 */`;

function formatDate(date) {
    return date.toISOString();
}

function appendHeader(javascriptCode) {
    return HEADER_COMMENT + '\n' + javascriptCode;
}
