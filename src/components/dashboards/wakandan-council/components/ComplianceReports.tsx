
export const ComplianceReports = () => {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">Compliance Reports</h3>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
            <div>
              <p className="text-sm font-medium">Report #{i}</p>
              <p className="text-sm text-muted-foreground">
                Verified on: 2024-0{i}-15
              </p>
            </div>
            <button className="text-sm text-primary hover:underline">
              View Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
