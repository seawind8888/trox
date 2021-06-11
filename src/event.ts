
type QueueKeyType = string | number |symbol
class EventQueue {
    queue: Array<QueueKeyType> = []
    enqueue(key:QueueKeyType) {
        this.queue.push(key)
    }
    dequeue(callback = () => {}) {
        this.queue.shift()
        if(this.empty()) {
            callback()
        }
      
        
    }
    empty() {
        return this.queue.length === 0 ? true : false
    }
    length() {
        return this.queue.length
    }
}

export default new EventQueue()