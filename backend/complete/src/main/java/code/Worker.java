package code;

public class Worker {
    private int id;
    private String name;
    private int age;
    private boolean busy;

    public Worker(int id,String name,int age){
        this.id = id;
        this.name = name;
        this.age = age;
        busy = false;
    }

    public int getId() {
        return id;
    }

    public void setBusy() {
        busy = true;
    }

    public void setUnbusy(){
        busy = false;
    }

    public int getAge() {
        return age;
    }

    public String getName() {
        return name;
    }

    public boolean getBusy(){
        return busy;
    }

    public void setName(String newName){
        name = newName;
    }

    public void setAge(int newAge){
        age = newAge;
    }

    public String toString(){
        return "Id: " +  id + " Name: " + name + " age: " + age;
    }
}
