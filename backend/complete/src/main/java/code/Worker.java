package code;

public class Worker {
    private int id;
    private String name;
    private int age;

    public Worker(int id,String name,int age){
        this.id = id;
        this.name = name;
        this.age = age;
    }

    public int getId() {
        return id;
    }

    public int getAge() {
        return age;
    }

    public String getName() {
        return name;
    }

    public String toString(){
        return "Id: " +  id + " Name: " + name + " age: " + age;
    }
}
