export function dataURLtoBlob(dataurl: string) {
    let arr = dataurl.split(',')
    let mime = arr[0]!.match(/:(.*?);/)![1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
}

export function downloadFile(url: string, name = 'download') {
    let a = document.createElement("a")
    a.setAttribute("href", url)
    a.setAttribute("download", name)
    a.setAttribute("target", "_blank")
    let clickEvent = document.createEvent("MouseEvents");
    clickEvent.initEvent("click", true, true);
    a.dispatchEvent(clickEvent);
}

export function downloadFileByBase64(base64: string, name: string) {
    let myBlob = dataURLtoBlob(base64)
    let myUrl = URL.createObjectURL(myBlob)
    downloadFile(myUrl, name)
}