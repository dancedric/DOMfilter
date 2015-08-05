(function(window){
    'use strict';

    var FILTERABLE_SELECTOR, FILTER_CONTROL, FORM_INPUT,FILTER_ATTRIBUTE_BUTTON,COLUMN_NUMBER,SEARCH_BOX_SELECTOR,EXCLUDE_BY_ID,EXCLUDE_BY_LABEL,PARENT_CATEGORY_IDS,PARENT_CATEGORY_NAMES,resourceLibrary,attributes,isSearchTerm;

    $.fn.DOMfilter = function(args) {
    	///// THINGS YOU CAN EDIT - START /////
	    
	    FILTERABLE_SELECTOR = this.selector; //class name of the elements to be filtered
	    FILTER_CONTROL = (args && args.filterControl) ? $(args.filterControl) : $("#filter-control"); //class or id of the where to show the filter controls
	    FORM_INPUT = (args && args.formInput) ? $(args.formInput) : 'checkbox'; //'checkbox' or 'radio'(in progress)
	    FILTER_ATTRIBUTE_BUTTON = (args && args.filterAttributeButton) ? $(args.filterAttributeButton) : $(".filter-attribute-button");
	    COLUMN_NUMBER = (args && args.columnNumber) ? $(args.columnNumber) : 3;
	    SEARCH_BOX_SELECTOR = (args && args.searchBoxSelector) ? $(args.searchBoxSelector) : $(".resource-search-box");
	    EXCLUDE_BY_ID = (args && args.excludeByID) ? (args.excludeByID) : '';
	    EXCLUDE_BY_LABEL = (args && args.excludeByLabel) ? (args.excludeByLabel) : '';	
	    resourceLibrary = {};
		attributes = [];
		PARENT_CATEGORY_IDS = (args && args.parentCategoryIds) ? (args.parentCategoryIds) : '';
	    PARENT_CATEGORY_NAMES = (args && args.parentCategoryNames) ? (args.parentCategoryNames) : '';
	    ///// THINGS YOU CAN EDIT - START /////
	    
	    getAttributes();
	    layOutFilterControls();
	    setEvents();
    }

    function getAttributes() {    
		for(var x in PARENT_CATEGORY_IDS) {
			attributes[ PARENT_CATEGORY_IDS[x] ] = {};
		}
    	$(FILTERABLE_SELECTOR).add('.item').each(function(k,v) {
			var split = String( $(v).data("filter-attribute") ).split(",");
			var split_labels = String( $(v).data("filter-labels") ).split(",");
			var split_parents = String( $(v).data("filter-parents") ).split(","); 
			
				for(var i=0;i<split.length;i++) {
					for(x in PARENT_CATEGORY_IDS) {
					if(PARENT_CATEGORY_IDS[x] == split_parents[i] && $.inArray(split[i], attributes[ PARENT_CATEGORY_IDS[x] ]) == -1 ) 
						attributes[ PARENT_CATEGORY_IDS[x] ][ split[i] ] = split_labels[i];
						//attributes[ PARENT_CATEGORY_IDS[x] ].push(split[i]);
					}
				}	
		});
		//console.log(attributes);
    }

    function layOutFilterControls() {
    	var i=0;
    	for(var x in attributes) {
    		FILTER_CONTROL.append("<section class='section' by='"+x+"'><div class='title'>Filter by "+PARENT_CATEGORY_NAMES[i]+"</div><div class='content'></div></section>");
    		for(var y in attributes[x]) {
    			var input = '<div><label><input type="'+FORM_INPUT+'" class="filter-attribute-button" name="filter-attribute-selector" value="'+y+'"> '+attributes[x][y]+'</label></div>';
				FILTER_CONTROL.find(".section[by='"+x+"'] .content").append( input );	
    		}
    		i++;
    	}
    	if( FILTER_ATTRIBUTE_BUTTON.length == 0) FILTER_ATTRIBUTE_BUTTON = $(FILTER_ATTRIBUTE_BUTTON.selector); //because elements have just been dynamically created*/
    }

    function setEvents() {
    	FILTER_CONTROL.on("change", ".filter-attribute-button", function() {
    		filterResults();
    	});	

    	var thread = null;
		SEARCH_BOX_SELECTOR.keyup(function() {
			clearTimeout(thread);
			thread = setTimeout( function() {filterResults()}, 500 ); 
		});

		$(".resource-search-box-button").click( function(e) {
			e.preventDefault();
			filterResults();
		});

    }

    function filterResults() {
    	var collection = [];
    	$(FILTERABLE_SELECTOR).find('.item').each(function(k,v) {
    		collection.push(k);	
    	});
    	collection = ( $(".resource-search-box").length > 0 ) ? filterBySearchTerm( $(".resource-search-box").val(), collection ) : [];
    	collection = filterByAttribute(collection);
    	hideShowElements(collection);
    }

    function filterBySearchTerm(keyword, collection) {
    	var r = [];
    	$.each(collection, function(k,v) {
    		if( $(FILTERABLE_SELECTOR).find('.item').eq(v).find(".title").text().toLowerCase().indexOf( keyword.toLowerCase() ) > -1 )    		
    			r.push(k);
    	});
    	return r;
    }

    function filterByAttribute(collection) {
    	var r = [];
    	$.each(collection, function(k,v) { //the items that were returned
    		var element_attributes = String($(FILTERABLE_SELECTOR).find('.item').eq(v).data("filter-attribute")).split(",");
    		$(FILTER_ATTRIBUTE_BUTTON).each( function(k2,v2) { // the selected checkboxes
				if( $(v2).is(":checked") ) {
					if( $.inArray( $(v2).val(), element_attributes ) > -1 ) {
						if( ($.inArray(v, r ) > -1) )
							return true; //skip it
						else
						 	r.push(v);
					}
				}
			});
    	});
    	if(r.length == 0) return collection;
    	else return r;
    }

    function hideShowElements(collection) {
    	$(FILTERABLE_SELECTOR).find(".item").hide();	
	    $.each( collection, function(k,v) {
	    	$(FILTERABLE_SELECTOR).find('.item').eq(v).show();
	    });
	    if(collection.length == 0)  
    		$(FILTERABLE_SELECTOR).append("<div class='no-results-found'>Sorry, no search results found.</div>");
    }
})(window);