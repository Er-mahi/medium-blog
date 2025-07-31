interface BlogCardProps {
        authorName: string;
        title: string;
        content: string;
        publishedDate: string;
    }
export const Blogcard = ({
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps)=>{
    
    return <div className="border-b border-slate-200 pb-4 pt-10">
        <div className="flex">
            <div className="flex justify-center flex-col">
                <Avatar name={authorName} />
            </div> 
            <div className="font-extralight pl-2 text-sm">
                {authorName}
            </div>
            <div className="flex justify-center flex-col pl-2">
                <Circle/>
            </div> 
            <div className="pl-2 font-thin text-slate-400">
                {publishedDate}
            </div>
        </div>

        <div className="text-xl font-bold">
            {title}
        </div>

        <div className="text-md font-thin">
            {content.slice(0, 170) + "..."}
        </div>

        <div className="text-slate-500 text-sm forn-thin pt-4 pb-4">
            {`${Math.ceil(content.length/100)} minute(s) read`}
        </div>

    </div>
}

function Circle(){
   return(
    <div className="h-1 w-1 rounded-full bg-slate-400">

    </div>
   )
}

export function Avatar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden
     bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="text-xs text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div>
  );
}
