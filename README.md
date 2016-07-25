# Typescript-React-PnP-SharePointSearch
Using Typescript, PnP library and React to display VERY basic SharePoint search results - built in Visual Studio Code

This project is my first trial at combining Typescript, React, the PnP Core JavaScript library and Office UI Fabric to interact with SharePoint Online.

It was created in Visual Studion Code, and uses Gulp plus various plugins (including Browserify) to handle the compile and bundling into a single custom ES5 JavaScript file (together with a number of other library files).

An HTML file is included - this is uploaded to SharePoint. To surface the functionality, reference this HTML file in a Content Editor Web Part.

There is one other file that is required, but is not included in the source. Gulp-spsave is used for uploading to SharePoint, and this plugin uses plan text credentials. 
You need to add a file named "settings.json" in teh parent folder that contains this source folder. That JSON file needs to include three properties: 
<ul>
<li>"username" - the Office 365 account name that can upload to site asets library</li>
<li>"password" - the password for that Office 365 account</li>
<li>"siteUrl" -the absolute URL to the SharePoint site collection containing the site assets library</li>
</ul>
