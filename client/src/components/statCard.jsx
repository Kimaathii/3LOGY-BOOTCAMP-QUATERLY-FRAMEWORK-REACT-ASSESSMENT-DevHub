function StatCard({title, count, icon: Icon}){
    return(
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="flex items-center gap-4">
                <Icon className="text-blue-500" size={32} />
                <div>
                    <h3 className="text-slate-400 text-sm">{title}</h3>
                    <p className="text-white text-3xl font-bold">{count}</p>
                </div>
            </div>
        </div>
    );

}
export default StatCard