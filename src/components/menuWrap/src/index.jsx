import { MenuItem, Submenu, HeadMenu } from 'tdesign-vue-next'
export default defineComponent({
  name: 'MenuWrap',
  setup(props, { slot }) {
    // console.log('props: ', props);
    // console.log('slot: ', slot);
    const menuData = shallowRef([
      {
        title: "降消费", value: "FlowBack",  children: [
          { title: '主页', value: 'cdcd' },
          { title: '详情页', value: 'cdcd'  },
      ] },
      { title: "宽带预约", value: "BroadReserve" },
    ]);

    const render = () => {
      return <HeadMenu theme="dark">
        {
          menuData.value.map(({ children, ...item  }) => {
            // console.log('item: ', compName, item);
            return <MenuItem {...item}>
              {() => 'xx'}
              <span>{item.title}</span>
            </MenuItem>
        }) }
      </HeadMenu>
    }
    return render
  },
})
