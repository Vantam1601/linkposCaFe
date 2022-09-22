package com.az.beta;

import android.os.Handler;

import java.util.Timer;
import java.util.TimerTask;

public class AhluTimer {
    private Timer timer;
    private TimerTask timerTask;
    private Runnable a;
    //we are going to use a handler to be able to run in our TimerTask
    final Handler handler = new Handler();
    public void start(final Runnable a) {
        start(a,10000);
    }

    public void start(final Runnable a,int t) {
        start(a,10000,5000);
    }
    public void start(final Runnable a,int t,int timeafter) {
        if (timer != null) return;
        this.a = a;
        //set a new Timer
        timer = new Timer();

        //initialize the TimerTask's job
        init();

        //schedule the timer, after the first 5000ms the TimerTask will run every 10000ms
        timer.schedule(timerTask, timeafter, t); //
    }

    public void stop() {
        //stop the timer, if it's not already null
        if (timer != null) {
            timer.cancel();
            timer = null;
            a= null;
        }
    }

    public void init() {

        timerTask = new TimerTask() {
            public void run() {

                //use a handler to run a toast that shows the current timestamp
                handler.post(a);
            }
        };
    }
}
