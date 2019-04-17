package code;

public class WorkerInShift {
    private int workerId;
    private int shiftId;

    public WorkerInShift(int workerId,int shiftId){
        this.workerId = workerId;
        this.shiftId = shiftId;
    }

    public int getShiftId() {
        return shiftId;
    }

    public int getWorkerId() {
        return workerId;
    }
}
