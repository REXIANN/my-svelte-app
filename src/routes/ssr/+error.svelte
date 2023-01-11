<script>
	import { page } from '$app/stores';
</script>

<div>an Error has occured during render.</div>

<div>
	page status: {$page.status}
	<br />
	error message: {$page.error?.message ?? 'undefined...'}
</div>
