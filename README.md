# DOMfilter

##Intro
A jQuery extension that allows you to have a filter option that hides / shows elements. No ajax or server activity, just frontend DOM manipulation.

This extension looks for a container named `.filterable`. The code looks through all the `data-filter-attribute` of all children with the class `.item`, compiles them, and automatically generates filter controls under the `#filter-control` container.

The "text search" feature is simply looking through the `.title` of each `.item` if it contains the string being searched. It is case-INsensitive

Please do not download just yet. Code is still under development until this notice is removed.. 

##Requirements
* jQuery
* Your own HTML. It has to be laid out like so:

##Optional, Yet Ideal
* Bootstrap CSS - if ommitted, code will still work but search box might need some styling

###HTML Layout
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
      <div id="text-filter">
        <div class="input-group">
  			  <input type="text" class="form-control" name="resource-search-box" id="resource-search-box">
					<span class="input-group-btn"><button class="btn btn-default" id="resource-search-box-button">Filter</button></span>
				</div>
      </div>    
      <div id="checkbox-filters"></div> <!-- contents will be dynamically-generated -->
    </form>
  </div>
```
