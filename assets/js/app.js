(function ($) {

    // Init function for selectize to work each time we clone a panel
    var init = function ($el) {
        $('.icons', $el).selectize({
            sortField: 'text'
        }).removeClass("icons");

    };

    $(document).ready(function () {
        //___Start for cloning Text Panel___//
        $('.action-new').on('click', function () {
            var $template = $('.clonable').clone();
            //console.log($template);
            var randomId = Math.floor(Math.random() * 100) + 1,
                newId = 'acc-' + randomId;
            // Remove clonable class and in class from cloned element
            $template.removeClass('clonable');
            $template.find('.in').removeClass('in');
            // Assign random id and attr for newly added panel
            $template.find('#acc-1').attr('id', newId);
            $template.find('[href=#acc-1]').attr('href', '#' + newId);
            // Now append it to parent div #repeatable
            $('#repeatable').append($template);
            $template.show(); // Show the item

            init($template);
        });
        // Trigger the action-new click event
        $('.action-new').trigger("click");

        //__Start for draggin Panel__//
        $("#repeatable").sortable({
            revert: true
        });

        //___Start Panel Remove___//
        $(document).on('click', '.action-remove', function () {
            var panel = $(this).closest('.panel'),
                totalPanel = $('#repeatable').find('.panel').length;

            if (totalPanel != 2) {
                var result = confirm("Are Your sure");
                if (result == true) {
                    panel.remove();
                }

            } else {
                alert("Hey Dude! You can't delete last item :)");
            }
        });
        //___Start Live change Title___//
        $(document).on('keyup', '.title', function () {
            var newValue = $(this).val();
            $(this).closest('.panel').find('.panel-title > a  > .tx-title').text(newValue);
        });

        //___Start Icon change___//
        $(document).on('change', '.selectized', function () {
            var newIcon = $('i').attr('class');
            var newIconChange = $(this).val();

            if (newIcon !== newIconChange) {
                $(this).closest('.panel').find('#title-icon').removeClass(newIcon);
                $(this).closest('.panel').find('#title-icon').addClass('fa fa-' + newIconChange);
            }
        });

        //___Start Insert into Editor Panel___//

        $(document).on('click', '.action-insert', function () {
            var $presets = $('.presets').val(),
                $acc = $title = $content = $icon = '';

            $('.panel').each(function () {
                if (!$(this).hasClass("clonable")) {
                    $title = $(this).find('.title').val(),
                        $content = $(this).find('.content').val(),
                        $icon = $(this).find('.selectized').val();

                    $acc += '[xa_slide title="' + $title + '" icon="' + $icon + '"]' + $content + '[/xa_slide]';
                }
            });
            wp.media.editor.insert('[xa_acc style="' + $presets + '" ]' + $acc + '[/xa_acc]');

        });

        if(!$('.panel-collapse').hasClass('in')) {
                $('.panel-collapse').addClass('in');
              
            }
    });

// Preset Style 

$(document).on('change', '.presets', function(){		
  
	var newIcon = $('#repeatable').attr('class');
	var newIconChange = $(this).val();

	if(newIcon!==newIconChange){

	$(this).next('#repeatable').removeClass(newIcon);
	$(this).next('#repeatable').addClass('panel-group ui-sortable ' + newIconChange);
	}

});
//___Admin Style Change___//


})(jQuery);