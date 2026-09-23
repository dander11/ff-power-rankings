import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import MarkdownIt from 'markdown-it'
import markdownItAttrs from "markdown-it-attrs";

export default function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("css/index.css");
    eleventyConfig.addPassthroughCopy("assets/");
    	// Watch CSS files
	eleventyConfig.addWatchTarget("css/**/*.css");
	// Watch images for the image pipeline.
	eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpg,jpeg,gif}");
	const md = new MarkdownIt()
	md.use(markdownItAttrs);
	eleventyConfig.setLibrary('md', md);
	// Per-page bundles, see https://github.com/11ty/eleventy-plugin-bundle
	// Bundle <style> content and adds a {% css %} paired shortcode
	eleventyConfig.addBundle("css", {
		toFileDirectory: "dist",
		// Add all <style> content to `css` bundle (use <style eleventy:ignore> to opt-out)
		// Supported selectors: https://www.npmjs.com/package/posthtml-match-helper
		bundleHtmlContentFromSelector: "style",
	});
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, 
    //make the image widths 72px
    {
        widths: [60],        
		failOnError: false
    });
	eleventyConfig.setOutputDirectory("docs")

};
