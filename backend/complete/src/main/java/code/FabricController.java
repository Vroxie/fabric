package code;

import java.io.*;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import org.springframework.web.bind.annotation.*;

@RestController
public class FabricController {

    private List<Worker> workers = new ArrayList<>();
    private List<Shift> shifts = new ArrayList<>();
    private List<WorkerInShift> workerInShifts = new ArrayList<>();
    private Gson gson = new Gson();

    public FabricController() throws IOException {
        workers.add(new Worker(workers.size(),"Victor",22));
        workers.add(new Worker(workers.size(),"Virre",21));
        workers.add(new Worker(workers.size(),"Pelle",40));
        shifts.add(new Shift(15,20,new Date()));
        shifts.add(new Shift(10,15,new Date()));
        /*
        workerInShifts.add(new WorkerInShift(0,0));
        FileWriter fw = new FileWriter("workersinShift.json");
        String data = gson.toJson(workerInShifts);
        fw.write(data);
        fw.close();*/

    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/del")
    @ResponseBody
    public void delete(@RequestParam String type,@RequestParam int id) throws IOException {
        Type REVIEW_TYPE;
        List<Worker> w;
        List<Shift> s;
        List<WorkerInShift> ws;
        String data = "";
        if(type.equals("workinshift")){
            REVIEW_TYPE = new TypeToken<List<WorkerInShift>>() {
            }.getType();
            JsonReader jsonReader = new JsonReader(new FileReader("workersinShift.json"));
            ws = gson.fromJson(jsonReader,REVIEW_TYPE);
            ws.remove(id);
            data = gson.toJson(ws);
            FileWriter fw = new FileWriter("workersinShift.json");
            fw.write(data);
            fw.close();
        }
        else if(type.equals("workers")){
             REVIEW_TYPE = new TypeToken<List<Worker>>() {
            }.getType();
            JsonReader jsonReader = new JsonReader(new FileReader("fabric.json"));
            w = gson.fromJson(jsonReader,REVIEW_TYPE);
            w.remove(id);
            data = gson.toJson(w);
            FileWriter fw = new FileWriter("fabric.json");
            fw.write(data);
            fw.close();
        }
        else if(type.equals("shifts")){
            REVIEW_TYPE  = new TypeToken<List<WorkerInShift>>() {
            }.getType();
            JsonReader jsonReader = new JsonReader(new FileReader("shifts.json"));
            s = gson.fromJson(jsonReader,REVIEW_TYPE);
            s.remove(id);
            data = gson.toJson(s);
            FileWriter fw = new FileWriter("shifts.json");
            fw.write(data);
            fw.close();
        }

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/addworker")
    public void addWorker(@RequestParam String name, @RequestParam int age) throws IOException {
        Type REVIEW_TYPE = new TypeToken<List<Worker>>() {
        }.getType();
        JsonReader jsonReader = new JsonReader(new FileReader("fabric.json"));
        List<Worker> w = gson.fromJson(jsonReader,REVIEW_TYPE);
        Worker nWorker = new Worker(w.size(),name,age);
        w.add(nWorker);
        String data = gson.toJson(w);
        FileWriter fw = new FileWriter("fabric.json");
        fw.write(data);
        fw.close();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/addshift")
    public void addShift(@RequestParam int startHour,@RequestParam int endHour,@RequestParam long date) throws IOException {
        Type REVIEW_TYPE = new TypeToken<List<Shift>>() {
        }.getType();
        JsonReader jsonReader = new JsonReader(new FileReader("shifts.json"));
        Date dat = new Date(date);
        Shift shift = new Shift(startHour,endHour,dat);
        List<Shift> s = gson.fromJson(jsonReader,REVIEW_TYPE);
        s.add(shift);
        String data = gson.toJson(s);
        FileWriter fw = new FileWriter("shifts.json");
        fw.write(data);
        fw.close();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("addworkinshift")
    public void addworkInShift(@RequestParam int workerId, @RequestParam int shiftId) throws IOException {
        Type REVIEW_TYPE = new TypeToken<List<WorkerInShift>>(){
        }.getType();
        Type REVIEW_TYPEs = new TypeToken<List<Shift>>(){
        }.getType();
        JsonReader jsonReaderWS = new JsonReader(new FileReader("workersinShift.json"));
        JsonReader jsonReaderS = new JsonReader(new FileReader("shifts.json"));
        WorkerInShift workerInShift= new WorkerInShift(workerId,shiftId);
        List<WorkerInShift> ws = gson.fromJson(jsonReaderWS,REVIEW_TYPE);
        List<Shift> s = gson.fromJson(jsonReaderS,REVIEW_TYPEs);
        ws.add(workerInShift);
        s.remove(shiftId);
        String data = gson.toJson(ws);
        String sData = gson.toJson(s);
        FileWriter fw = new FileWriter("workersinShift.json");
        FileWriter fws = new FileWriter("shifts.json");
        fw.write(data);
        fw.close();
        fws.write(sData);
        fws.close();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping("/workers")
    public List<Worker> workers() throws FileNotFoundException {
        final Type REVIEW_TYPE = new TypeToken<List<Worker>>() {
        }.getType();
        JsonReader jsonReader = new JsonReader(new FileReader("fabric.json"));
        List<Worker> w = gson.fromJson(jsonReader,REVIEW_TYPE);
        return w;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping("/shifts")
    public List<Shift> shifts() throws FileNotFoundException {
        final Type REVIEW_TYPE = new TypeToken<List<Shift>>() {
        }.getType();
        JsonReader jsonReader = new JsonReader(new FileReader("shifts.json"));
        List<Shift> s = gson.fromJson(jsonReader,REVIEW_TYPE);
        return s;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping("/workersinshift")
    public List<WorkerInShift> workersinShift() throws FileNotFoundException {
        final Type REVIEW_TYPE = new TypeToken<List<WorkerInShift>>() {
        }.getType();
        JsonReader jsonReader = new JsonReader(new FileReader("workersinShift.json"));
        List<WorkerInShift> ws = gson.fromJson(jsonReader,REVIEW_TYPE);
        return ws;
    }
}
