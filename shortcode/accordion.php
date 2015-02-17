<?php
function accordion_shortcode($attr, $content= null){

	$default = array(
          'style' => 'default'
		);

	$data = shortcode_atts($default, $attr);

	$content = do_shortcode($content);

	return '<div class="panel-group '.$data['style'].'"  id="accordion" role="tablist" aria-multiselectable="true">
'.$content.'</div>';
}
add_shortcode('xa_acc','accordion_shortcode');

function accordion_shortcode_nested($attr, $content= null){

	$default = array(
		'title'=> 'Insert Your Title',
		'icon' => ''

		);
	$data = shortcode_atts($default, $attr);
	$rand = rand(1,100);

	//$content = do_shortcode($content);

	return '<div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingOne">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#acc-'.$rand.'" aria-expanded="true" aria-controls="collapseOne">
          <i class="fa fa-'.$data['icon'].'"></i> '.$data['title'].'
        </a>
      </h4>
    </div>
    <div id="acc-'.$rand.'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
      <div class="panel-body">
'.$content.'</div>
    </div>
  </div>';
}
add_shortcode('xa_slide','accordion_shortcode_nested');

?>