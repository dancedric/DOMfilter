# DOMfilter

##Intro
DOMfilter is a jQuery extension that allows you to have a filter option that hides / shows elements. No ajax or server activity, just frontend DOM manipulation.

Please do not download just yet. Code is still under development until this notice is removed.. 

##Example
Here is a (hopefully still) working example: http://eu-en.trapezegroup.com/resources



##Requirements
* jQuery
* ExpressionEngine - currently this codebase is rigged to take advantage of ExpressionEngine Categories/Category Groups
* Your own HTML. It has to be laid out like so:

##Optional, Yet Ideal
* Bootstrap CSS - if ommitted, code will still work but search box might need some styling

##How It Works
####HTML Layout
######div container containing all the elements (possibly in a grid) that you would want to be affected by the filter
```
  <div class="filterable"> 
    <div class="item" data-filter-attribute="12,53,12" data-filter-label="Label one, Label two, Label one"> Item 1 </div>
    <div class="item" data-filter-attribute="12,23,13" data-filter-label="Label one, Other1, Label three"> Item 2 </div> 
    <div class="item" data-filter-attribute="12,0,1" data-filter-label="Other2, Other3, Other4"> Item 3 </div> 
    ...
  </div>
```

######div container where you would want the dynamically-generated checkbox/radio to show.

```
  <div id="filter-control">
    <form>
      <div id="text-filter"><!-- This is the textbox search filter-->
        <div class="input-group">
  			  <input type="text" class="form-control" name="resource-search-box" id="resource-search-box">
					<span class="input-group-btn"><button class="btn btn-default" id="resource-search-box-button">Filter</button></span>
				</div>
      </div>    
      <div id="checkbox-filters"></div> <!-- contents will be dynamically-generated -->
    </form>
    
    <!-- CODE ENCLOSED WILL BE DYNAMICALLY GENERATED -->
    <section class="section" by="*ID*">
    	<div class="title">Sample Title 1</div>
    	<div class="content">
    		<div>
    			<label>
    			<input type="checkbox" class="filter-attribute-button" name="filter-attribute-selector" value="237"> 				Articles
    			</label>
    		</div>
    	</div>
    </section>
    <!-- CODE ENCLOSED WILL BE DYNAMICALLY GENERATED -->
    
  </div>
```
This extension looks for an overall div container named `.filterable`(changeable). The code looks through all the `data-filter-attribute` of all the immediate children with the class `.item`. This extension compiles them, and automatically generates filter controls and places them under the `#filter-control` div container. These will be checkbox (radio button feature--soon to come) options that reflect the  

The "text search" feature is simply looking through the `.title` of each `.item` if it contains the string being searched. It is case-INsensitive

#How to use
###Initialization
After loading jQuery, Bootstrap(optional), and your [HTML](#html-layout) as laid out above, you can initiate this by doing:
```
$('.filterable').DOMfilter();
```
Without any options, that's all you will need to do.
You can use any selector you wish as long as it's follows the [HTML Layout](#html-layout)

###Options

#####filterControl
Default: #filter-control
Description: The element present in the DOM where all the dynamically-generated checkboxes will appear.

#####searchBoxSelector
Default: .resource-search-box
Description: The input[type="text"] element of your search box in the filter.

#####excludeById
Default: '' (array - integer)
Description: The array of ID's (data-filter-attribute) that you do now want to be processed nor included in the filter.

#####excludeByLabel
Default: '' (Array - string)
Description: The array of labels (data-filter-labels) that you do now want to be processed nor included in the filter.

#####parentCategoryIds
Default: '' (Array - integer)
Description: You can group your filter controls by section/categories. Listing the category id's here groups your filter by ID.

#####parentCategoryNames
Default: '' (Array - string)
Description: Connected with the option above, use this option to control the label that will show up for category. The order of labels will correspond to the order of the ID's.
