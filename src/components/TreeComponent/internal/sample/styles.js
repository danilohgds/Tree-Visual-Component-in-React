export default {
    component: {
        display: 'inline-block',
        verticalAlign: 'top',
        padding: '5px 0px 0px 16px',
        backgroundColor: '#FFFFFF',
        height: '450px',
        overflowY: 'scroll',
        overflowX: 'hidden',
        '@media (max-width: 640px)': {
            width: '100%',
            display: 'block'
        },
		border: '1px solid gray'
    },
    searchBoxPad: {
      padding: '0px'
    },
    hierarachybuttons: {
      paddingBottom:'10px',
    },
    viewer: {
        base: {
            fontSize: '12px',
            fontWeight : 'bold',
            whiteSpace: 'pre-wrap',
            backgroundColor: '#FFFFFF',
            border: 'solid 1px black',
            padding: '0px !important',
            color: 'BLACK',
            height: '100%',
            overflowY: 'scroll',
            overflowX: 'scroll'
        }
    }
};
