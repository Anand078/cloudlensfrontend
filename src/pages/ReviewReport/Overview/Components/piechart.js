import React from 'react';
import ReactEcharts from 'echarts-for-react';

const Pie = () => {
    const getOption = () => {
        return {
            toolbox: {
                show: false,
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['False', 'NA', 'True'],
                textStyle: {
                    color: ['#74788d']
                }
            },
            color: ['#108dff', '#14229f', '#e56c37'],
            series: [
                {
                    name: 'Count of choice',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: 171, name: 'False' },
                        { value: 114, name: 'NA' },
                        { value: 109, name: 'True' }
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
    };

    return (
        <React.Fragment>
            <ReactEcharts style={{ height: "350px" }}
                option={getOption()}
            />
        </React.Fragment>
    );
};

export default Pie;
