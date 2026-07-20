
import React,{useState} from 'react';
const items=[
{id:1,title:'Voice Assistant',imageUrl:'https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?q=80&w=1974&auto=format&fit=crop'},
{id:2,title:'Creative Design Studio',imageUrl:'https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop'},
{id:3,title:'Support Chat System',imageUrl:'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1974&auto=format&fit=crop'},
{id:4,title:'Workflow Assistant',imageUrl:'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2090&auto=format&fit=crop'},
{id:5,title:'Visual Understanding',imageUrl:'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=2070&auto=format&fit=crop'}];
export function LandingAccordionItem(){
const [a,setA]=useState(4);
return <div className='py-20 flex justify-center gap-4 overflow-x-auto'>{items.map((i,x)=><div key={i.id} onMouseEnter={()=>setA(x)} className={`relative h-[450px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ${a===x?'w-[400px]':'w-[60px]'}`}><img src={i.imageUrl} alt={i.title} loading='lazy' decoding='async' className='absolute inset-0 w-full h-full object-cover'/><div className='absolute inset-0 bg-black/40'/><span className={`absolute text-white font-semibold ${a===x?'bottom-6 left-1/2 -translate-x-1/2':'bottom-24 left-1/2 -translate-x-1/2 rotate-90'}`}>{i.title}</span></div>)}</div>
}
