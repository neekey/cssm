var Fs = require( 'fs' );
var Path = require( 'path' );
var iconv = require( 'iconv-lite' );
var _ = require( 'underscore' );
var CSSMin = require( './cssmin' );
var Log = require( './log' );

var DEFAULT_CONFIG = {
    charset: 'utf8',
    suffix: '-min'
};
var CSS_EXTENSION = '.css';

/**
 * Compress your css file.
 * @param cfg {
 *      input: [] or '',
 *      suffix: '-min',
 *      charset: 'utf8'
 * }
 */
module.exports.compress = function( cfg ){

    // Target required.
    if( !cfg.input || cfg.input.length == 0 ){
        Log.error( 'Input path is required!' );
        process.exit( 1 );
    }
    else {
        if( typeof cfg.input === 'string' ){
            cfg.input = [ cfg.input ];
        }
    }

    // Build configuration.
    cfg = _.defaults( cfg, DEFAULT_CONFIG );

    cfg.input.forEach(function(input){

        // Only compress `css` file
        if( Path.extname( input ) !== '.css' ){
            Log.error( 'CSS Only!', input );
            return;
        }

        // Filter all file with compress suffix
        if( ( new RegExp( cfg.suffix + CSS_EXTENSION ) ).test( input ) === true ){
            return;
        }

        // Build output path.
        var output = Path.join(
            Path.dirname( input ),
            Path.basename( input, CSS_EXTENSION ) + cfg.suffix + CSS_EXTENSION
        );

        try{
            // Convert charset
            var originData = iconv.decode( Fs.readFileSync( input ), cfg.charset );
            var outputData = CSSMin.cssmin( originData );
            Fs.writeFileSync( output, iconv.encode( outputData, cfg.charset ) );
        }
        catch( e ){
            Log.error( 'Error when compressing:', JSON.stringify(e));
        }

        Log.info( 'Compress ' + input + ' to', output );
    });
};