package code;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Shift {
    private int startHour;
    private int endHour;
    private Date datetime;
    private boolean isAvailable = true;

    public Shift(int startHour,int endHour,Date datetime){
        this.startHour = startHour;
        this.endHour = endHour;
        this.datetime = datetime;
    }

    public String getWorkingHours(){
        return startHour + "-" + endHour;
    }

    public String getDatetime() {
        SimpleDateFormat ft = new SimpleDateFormat("E yyyy.MM.dd");
        return ft.format(datetime);
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setBusy(){
        isAvailable = false;
    }

    public void setUnBusy(){
        isAvailable = true;
    }

    public void setDate(Date d){
        datetime = d;
    }

    public void setStartHour(int hour){
        startHour = hour;
    }

    public void setEndHour(int hour){
        endHour = hour;
    }

    public String toString(){
        SimpleDateFormat ft = new SimpleDateFormat("E yyyy.MM.dd");
        return "Working hours: " + getWorkingHours() + " date: "  + ft.format(datetime);
    }
}
