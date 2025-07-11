function selectionSort(arr){
    const n = arr.length;

    for(let i = 0;i<n-1;i++){
        let minIndex = i;

        for(let j = i+1;j<n;j++){
            for(arr[j] < arr[minIndex]){
                minIndex = j;
            }
        }
        if(minIndex !== i){
            [arr[i],arr[minIndex]] = [arr[minIndex],arr[i]];
        }
    }
}