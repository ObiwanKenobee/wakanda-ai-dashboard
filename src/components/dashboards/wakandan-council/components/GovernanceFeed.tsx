
export const GovernanceFeed = () => {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">Live Governance Feed</h3>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-start space-x-4 p-4 rounded-lg bg-white/5">
            <div className="flex-1">
              <p className="text-sm font-medium">Proposal #{i}</p>
              <p className="text-sm text-muted-foreground">
                Update sustainability metrics for Q2 2024
              </p>
            </div>
            <div className="text-sm text-primary">Active</div>
          </div>
        ))}
      </div>
    </div>
  );
};
