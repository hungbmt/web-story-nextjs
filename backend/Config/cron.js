const express = require('express');
const cron = require('node-cron');
const updateStoryTryenFull = require('./../Controller/CrawlManuallyTruyenFull.Controller');
const connect = require('./connectMySql');
//  đúng 1h sáng update 1 lần
// */1 * * * * 1 phút

const TryenFull = new updateStoryTryenFull();
const cronUpdateStory = () => {
    cron.schedule('*/1 * * * *', () => {
        TryenFull.updateStory().then(() => {
            console.log('update success');
        });
    });
};

const cronResetView = () => {
    try {
        // Reset daily views at midnight 0 0 * * *
        cron.schedule('0 0 * * *', async () => {
            try {
                await connect.query('UPDATE subpages SET view_day = 0');
                console.log('Daily views reset');
            } catch (error) {
                console.log(error);
            }
        });
        // reset view week
        cron.schedule('0 0 * * 0', async () => {
            try {
                await connect.query('UPDATE subpages SET view_today = 0');
            } catch (error) {
                console.log(error);
            }
        });
        // Reset monthly views on the first day of each month at midnight 0 0 1 * *
        cron.schedule('0 0 1 * *', async () => {
            try {
                await connect.query('UPDATE subpages SET view_month = 0');
                console.log('month views reset');
            } catch (error) {
                console.log(error);
            }
        });
        // reset views year 0 0 1 1 *
        cron.schedule('0 0 1 1 *'),
            async () => {
                try {
                    await connect.query('UPDATE subpages SET view_year = 0 ');
                    console.log('year views reset');
                } catch (error) {
                    console.log(error);
                }
            };
    } catch (error) {
        console.log(error);
    }
};

module.exports = { cronUpdateStory, cronResetView };
