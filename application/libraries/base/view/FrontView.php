<script>
	$('#red-content').append('<div class="red-content-container red-grid" style="padding-left:0; padding-right:0;"></div>')
	var site_url = "<?php echo base_url() . '/widget/latestproject'; ?>";
	$(".red-content-container").load(site_url);
</script>
