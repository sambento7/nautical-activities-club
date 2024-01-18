import React from 'react';
import { StyledBarChart, Container, CustomTitle } from './styles.ts';
import { useAppSelector } from '../../store/store.ts';

export const Stats = () => {
    const activities = useAppSelector((state) => state.activity.activities);
    const schedules = useAppSelector((state) => state.scheduling.schedules);

    const activityCounts = {};
    const totalActivityCount = schedules.length;

    schedules.forEach(schedule => {
        const activityId = schedule.activity.id;
        if (activityCounts[activityId]) {
            activityCounts[activityId]++;
        } else {
            activityCounts[activityId] = 1;
        }
    });

    const activityPercentages = activities.map(activity => {
        const count = activityCounts[activity.id] || 0;
        const percentage = (count / totalActivityCount) * 100;
        return Math.round(percentage); // Round the percentage
    });

    const chartData = {
        series: [{
            data: activityPercentages
        }],
        xAxis: [{
            data: activities.map(activity => activity.name), 
            scaleType: 'band' as 'band',// This is a hack to get around a bug in the typings
        }],
    };

    return (
        <Container>
            <CustomTitle> Activities Popularity </CustomTitle>
            <StyledBarChart
                series={chartData.series}
                height={290}
                xAxis={chartData.xAxis}
                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
        </Container>
    );
}
