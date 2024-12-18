export abstract class Api<T> {
  private url;
  constructor(resource?: string) {
    this.url = process.env.REACT_APP_API_URL + "/" + (resource || "");
  }

  async get(id: string, param?: string) {
    return this.buildQuery("GET", id + (param || ""));
  }
  async getAll(path?: string, param?: string) {
    return this.buildQuery("GET", param ? `${path || ""}?${param}` : "");
  }

  async post(payload: Partial<T>, path = "") {
    return this.buildQuery("POST", path, payload);
  }

  async put(id: string, payload: Partial<T>) {
    return this.buildQuery("PUT", id, payload);
  }

  async delete(id: string) {
    return this.buildQuery("DELETE", id);
  }

  private buildQuery = async (
    method?: string,
    suffix?: string,
    data?: Partial<T>
  ) => {
    // const token = getCookie();

    const headers: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    // set authentication header
    // if (token) {
    //   headers["Authorization"] = "Bearer " + token;
    // }

    const options: RequestInit = {
      method,
      headers,
    };
    if (!method || method !== "GET") {
      options.body = JSON.stringify(data || {});
    }

    // @TODO
    // modify response/error
    return fetch(this.getFullUrl(suffix), {
      ...options,
    })
      .then(async (res) => {
        const response = await res.json();

        if (res.ok) {
          return { data: response, status: true };
        }

        throw {
          error: response || new Error("Something went wrong.!"),
          status: false,
        };
      })
      .catch((err) => {
        throw err;
      });
  };

  private getFullUrl = (suffix?: string) =>
    this.url + (suffix ? `/${suffix}` : "");
}
