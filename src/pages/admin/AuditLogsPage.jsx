import { useMemo, useState } from "react";
import AuditFilters from "../../features/Audit/components/AuditFilters";
import { AuditLogEntryCard } from "../../features/Audit/components/AuditLogCard";
import { mockAuditLogs } from "../../features/Audit/mockAuditLogs";

const AuditLogsPage = () => {
  const [role, setRole] = useState("ALL");

  const filteredLogs = useMemo(() => {
    if (role === "ALL") return mockAuditLogs;

    return mockAuditLogs.filter(
      (log) => log.role === role
    );
  }, [role]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Audit Logs
        </h1>

        <p className="text-gray-500">
          Audit logs are immutable and cannot be modified.
        </p>
      </div>

      <AuditFilters
        selectedRole={role}
        setSelectedRole={setRole}
      />

      <div className="space-y-4">
        {filteredLogs.map((log) => (
          <AuditLogEntryCard
            key={log.id}
            entry={log}
          />
        ))}
      </div>
    </div>
  );
}


export default AuditLogsPage;
