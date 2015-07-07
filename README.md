# DOMfilter

##Intro
A jQuery extension that allows you to have a filter option that hides / shows elements. No ajax or server activity, just frontend DOM manipulation.

Please do not download just yet. Code is still under development until this notice is removed.. 

##Requirements
* jQuery
* Your own HTML. It has to be laid out like so:

###HTML Layout
```
<div>

  <div class="filterable"> 
    <div class="item" data-filter-attribute="12,53,12" data-filter-label="Label one, Label two"> Item 1 </div>
    <div class="item" data-filter-attribute="12,53,12" data-filter-label="Label one, Label two"> Item 2 </div> 
    <div class="item" data-filter-attribute="12,53,12" data-filter-label="Label one, Label two"> Item 3 </div> 
    ...
  </div>
  
  <div class="filter-control">
    <form>
    </form>
  </div>
</div>
```
