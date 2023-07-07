// form
export const formState = () => {
	const formItem = ref([
		{
			label: '姓名',
			name: 'name',
			rules: [{ required: true, message: '姓名必填' }],
		},
		{
			label: '性别',
			name: 'gender',
			rules: [{ required: true, message: '性别必填' }],
		},
	])
	const formData = ref(setData())
	const initFormData = () => {
		setTimeout(() => {
			formData.value = setData()
		}, 200)
	}
	function setData() {
		return { name: '', gender: '' }
	}
	return {
		initFormData,
		formData,
		formItem,
	}
}
