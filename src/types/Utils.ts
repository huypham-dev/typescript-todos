export default class Utils {
  static store(namespace : string, data? : any) {
    if (data) {
      return localStorage.setItem(namespace, JSON.stringify(data));
    }

    let store = localStorage.getItem(namespace);
    return (store && JSON.parse(store));
  }

  static genId() {
    return '_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}