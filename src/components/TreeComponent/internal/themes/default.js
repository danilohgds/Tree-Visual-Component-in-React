export default {
    tree: {
        base: {
            listStyle: 'none',
            backgroundColor: '#ffffff',
            color: 'black',
            fontWeight: 'bold',
            padding: '10px',
            fontFamily: 'lucida grande ,tahoma,verdana,arial,sans-serif',
            fontSize: '13px'
        },
        pushed:{
          cursor: 'not-allowed'
        },
        unpushed:{
           cursor: 'pointer'
        },
        node: {
            base: {
                position: 'relative'
            },
            link: {
                cursor: 'pointer',
                position: 'relative',
                padding: '0px 5px',
                display: 'block'
            },
            activeLink: {
                background: '#31363F'
            },
            toggle: {
                base: {
                    position: 'relative',
                    display: 'inline-block',
                    verticalAlign: 'top',
                    marginLeft: '-5px',
                    height: '24px',
                },
                wrapper: {
                    margin: '-7px 0 0 -7px',
                    height: '14px'
                },
                height: 14,
                width: 10,
                arrow: {
                    fill: '#FFFFF',
                    strokeWidth: 0
                }
            },
            header: {
                base: {
                    display: 'inline-block',
                    verticalAlign: 'top',
                    color: 'BLACK'
                },
                connector: {
                    width: '2px',
                    height: '12px',
                    borderLeft: 'solid 2px black',
                    borderBottom: 'solid 2px black',
                    top: '0px',
                    left: '-21px'
                },
                title: {
                    lineHeight: '24px',
                    verticalAlign: 'left'
                }
            },
            subtree: {
                listStyle: 'none',
                paddingLeft: '19px'
            },
            assignedsubtree: {
                listStyle: 'none',
                paddingLeft: '0px'
            },
            loading: {
                color: '#E2C089'
            }
        }
    }
};
