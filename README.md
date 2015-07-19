# Jose B. Gomes CV

This is the CV builder for Jose B. Gomes, a compiled version can be downloaded from:

	https://github.com/jbonigomes/JoseBGomesCV/blob/master/JoseBGomes.pdf?raw=true
	
To download the grayscale version:

	https://github.com/jbonigomes/JoseBGomesCV/blob/master/JoseBGomes_bw.pdf?raw=true

## To compile html to pdf

	wkhtmltopdf -L 0 -T 0 -B 0 -R 0 JoseBGomes.xhtml JoseBGomes.pdf

## To compile grayscale

	wkhtmltopdf -L 0 -T 0 -B 0 -R 0 -g JoseBGomes.xhtml JoseBGomes.pdf

## To compile in low res

	wkhtmltopdf -L 0 -T 0 -B 0 -R 0 -l JoseBGomes.xhtml JoseBGomes.pdf

## To compile grayscaled low res

	wkhtmltopdf -L 0 -T 0 -B 0 -R 0 -l -g JoseBGomes.xhtml JoseBGomes.pdf
	
## Notes

To download wkhtmltopdf, go to:

	http://wkhtmltopdf.org/

This CV uses Raphael.js for creating icons, for more information, go to:

	http://raphaeljs.com/
